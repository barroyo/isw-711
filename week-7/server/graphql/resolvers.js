const jwt = require('jsonwebtoken');
const Course = require('../models/course');
const Teacher = require('../models/teacher');
const User = require('../models/user');

function requireAuth(ctx) {
  if (!ctx.user) {
    const err = new Error('Authentication token required');
    err.extensions = { code: 'UNAUTHENTICATED' };
    throw err;
  }
  return ctx.user;
}

const resolvers = {
  Course: {
    id: (doc) => String(doc._id),
    teacher: async (doc) => {
      if (doc.teacher && typeof doc.teacher === 'object' && doc.teacher._id) return doc.teacher;
      return await Teacher.findById(doc.teacher);
    },
  },
  Teacher: {
    id: (doc) => String(doc._id),
  },
  User: {
    id: (doc) => String(doc._id),
  },

  Query: {
    me: async (_p, _a, ctx) => ctx.user,

    teachers: async (_p, _a, ctx) => {
      requireAuth(ctx);
      return await Teacher.find();
    },
    teacher: async (_p, { id }, ctx) => {
      requireAuth(ctx);
      return await Teacher.findById(id);
    },

    courses: async (_p, _a, ctx) => {
      requireAuth(ctx);
      return await Course.find().populate('teacher');
    },
    course: async (_p, { id }, ctx) => {
      requireAuth(ctx);
      return await Course.findById(id).populate('teacher');
    },
  },

  Mutation: {
    login: async (_p, { email, password }, ctx) => {
      if (!email || !password) {
        const err = new Error('Email and password are required');
        err.extensions = { code: 'BAD_USER_INPUT' };
        throw err;
      }

      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        const err = new Error('Invalid email or password');
        err.extensions = { code: 'UNAUTHENTICATED' };
        throw err;
      }

      const payload = { userId: user._id, email: user.email };
      const token = jwt.sign(payload, ctx.jwtSecret, { expiresIn: '1h' });
      return { token };
    },

    createTeacher: async (_p, { input }, ctx) => {
      requireAuth(ctx);
      const teacher = new Teacher(input);
      await teacher.save();
      return teacher;
    },

    createCourse: async (_p, { input }, ctx) => {
      requireAuth(ctx);
      const teacher = await Teacher.findById(input.teacherId);
      if (!teacher) {
        const err = new Error('Teacher not found');
        err.extensions = { code: 'BAD_USER_INPUT' };
        throw err;
      }

      const course = new Course({
        name: input.name,
        credits: input.credits,
        teacher: teacher._id,
      });
      await course.save();
      return await Course.findById(course._id).populate('teacher');
    },

    updateCourse: async (_p, { id, input }, ctx) => {
      requireAuth(ctx);

      const update = {};
      if (typeof input.name === 'string') update.name = input.name;
      if (typeof input.credits === 'number') update.credits = input.credits;
      if (input.teacherId) {
        const teacher = await Teacher.findById(input.teacherId);
        if (!teacher) {
          const err = new Error('Teacher not found');
          err.extensions = { code: 'BAD_USER_INPUT' };
          throw err;
        }
        update.teacher = teacher._id;
      }

      const course = await Course.findByIdAndUpdate(id, update, { new: true }).populate('teacher');
      if (!course) {
        const err = new Error('Course not found');
        err.extensions = { code: 'NOT_FOUND' };
        throw err;
      }
      return course;
    },

    deleteCourse: async (_p, { id }, ctx) => {
      requireAuth(ctx);
      const deleted = await Course.findByIdAndDelete(id);
      return Boolean(deleted);
    },
  },
};

module.exports = { resolvers };

