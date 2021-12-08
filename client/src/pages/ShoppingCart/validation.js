import Joi from "joi"

class datacheck{
// orderer 格式
 ordererValidation(data){
  const schema = Joi.object({
    id: Joi.number(),
    first_name: Joi.string().min(1).max(15).required(),
    last_name: Joi.string().min(1).max(15).required(),
    telephone: Joi.string()
      .length(10)
      .pattern(new RegExp("^[0, 9]{2}[0-9]{8}$"))
      .required(),
    birthday: Joi.date().less("now").required(),
    email: Joi.string()
      .min(6)
      .max(50)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  });

  return schema.validate(data);
};

// student 格式
studentValidation(data){
  const schema = Joi.object({
    member_id: Joi.number(),
    id: Joi.number(),
    first_name: Joi.string().min(1).max(15).required(),
    last_name: Joi.string().min(1).max(15).required(),
    telephone: Joi.string()
      .length(10)
      .pattern(new RegExp("^[0, 9]{2}[0-9]{8}$"))
      .required(),
    birthday: Joi.date().less("now").required(),
    email: Joi.string()
      .min(6)
      .max(50)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    addIntoStudent: Joi.boolean().required(),
    autoUpdateMember: Joi.boolean().required(),
    created_time: Joi.date(),
    valid: Joi.number()
  });

  return schema.validate(data);
};

// creditCard 格式
creditCardValidation = (data) => {
  const schema = Joi.object({
    number: Joi.string().length(16).required(),
    name: Joi.string().min(1).max(30).required(),
    expiry:Joi.string().length(4),
    cvc:Joi.string().length(3)
  });

  return schema.validate(data);
};
}

//let datacheck1 = new datacheck()
//export default {ordererValidation : datacheck1.ordererValidation}
export default new datacheck()