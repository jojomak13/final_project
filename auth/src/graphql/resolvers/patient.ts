export default {
  Query: {
    patient: () => {
      return { hello: 'i am patient' };
    },
  },
  Mutation: {
    patientActions: () => {
      return {
        signup: () => {
          return { name: 'test' };
        },
      };
    },
  },
};
