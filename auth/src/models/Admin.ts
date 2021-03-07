import mongoose from 'mongoose';

interface AdminAttrs {
  name: string;
  email: string;
  password: string;
}

interface AdminDocument extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AdminModel extends mongoose.Model<AdminDocument> {
  build(atters: AdminAttrs): AdminDocument;
}

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AdminSchema.statics.build = (atters: AdminAttrs) => {
  return new Admin(atters);
};

const Admin = mongoose.model<AdminDocument, AdminModel>('Admin', AdminSchema);

export { Admin };
