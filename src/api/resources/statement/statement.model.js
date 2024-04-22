import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const { Schema } = mongoose
const statementSchema = new Schema({
  ReportingPeriod: {
    type: String,
    required: [true, 'Statement must have a ReportingPeriod']
  },
  CreationDate: {
    type: Date,
    required: [false, 'Statement must have a creation Date ']
  },
  DeclarationType: {
    type: String,
    required: [true, 'Statement must have a DecalrationType']
  },
  ReportingType: {
    type: String,
    required: [true, 'Statement must have a ReportingType']
  },
  DeclarationContent: {
    type: String,
    required: [true, 'Statement must have a DecalrationContent']
  },

  OriginID: {
    type: String,
    required: false
  },

  Statuts: {
    type: String,
    required: [true]
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
statementSchema.plugin(mongoosePaginate)
export default mongoose.model('Statement', statementSchema)
