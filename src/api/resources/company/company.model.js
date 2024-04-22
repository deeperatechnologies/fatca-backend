import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const companySchema = new Schema({
  name: {
    unique: true,
    type: String,
    required: [true, 'Company must have a name'],
  },
  GIIN: {
    unique: true,
    type: String,
    required: [true, 'Company must have a GIIN number '],
  },
  address: {
    type: String,
    required: [true, 'Company must have an address'],
  },
  numval: {
    unique: true,
    type: Number,
    required: [true, 'Company must have a numval'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
companySchema.plugin(mongoosePaginate);
export default mongoose.model('Company', companySchema);
