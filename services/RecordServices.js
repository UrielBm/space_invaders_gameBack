const Register = require("./../models/register");

class RecordServices {
  getRecords() {
    const query = Register.find().exec();
    return query;
  }
  topTen() {
    const query = Register.find().sort({ score: "desc" }).limit(10).exec();
    return query;
  }
  getRecordById(id) {
    const query = Register.findOne({ _id: id }).exec();
    return query;
  }
  postRecord(record) {
    console.log(record);
    const newRecord = new Register(record);
    return newRecord.save();
  }
}
module.exports = RecordServices;
