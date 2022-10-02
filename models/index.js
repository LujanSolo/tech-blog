const User = require('./User');
const Note = require('./Note');
const Comment = require('./Comment');

//*relationship 1-1, 1-many, many-many
User.hasMany(Note, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//* association (linking)
Note.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Note, {
  foreignKey: 'note_id',
});

module.exports = { User, Note, Comment };