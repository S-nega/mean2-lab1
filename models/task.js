const mongoose = require('mongoose');

// Определение схемы задачи
const taskSchema = mongoose.Schema(
  {
    title: { 
      type: String, 
      // required: true 
    },
    description: { 
      type: String, 
      // default: '' 
    },
    completed: { 
      type: Boolean, 
    }
  }
);

// Определение модели задачи
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
