import bcrypt from "bcrypt";

const plainPassword = "GravyTrain";
const saltRounds = 12;

const hash = await bcrypt.hash(plainPassword, saltRounds);
console.log(hash);