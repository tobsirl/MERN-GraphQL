import Joi from 'joi';

export const startChat = Joi.object().keys({
  title: Joi.string().min(6).max(50).label('Title'),
  userIds: Joi.array().min(1).max(100).unique().items(
    
  )
})
