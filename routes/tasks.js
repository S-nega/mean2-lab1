var express = require('express');
var router = express.Router();
const Task = require('..//models/task.js');



//get all tasks
router.get('/', async(req, res) => {
  try{
      const tasks = await Task.find({});
      console.log(tasks);
      res.status(200).render(`tasks`, {tasks: tasks});

  } catch (error){
      res.status(500).json({message: error.message});
  }
});

//get page of adding new task
router.get('/add', async(req, res) => {
  try{
      res.status(200).render(`addtask`);
  } catch (error){
      res.status(500).render('error', {message: error.message});
  }
})

//create new task
router.post('/', async(req, res) => {
  try{
      const task = await Task.create(req.body)
      console.log(task);
      res.status(200).redirect('/api/tasks');
  } catch (error){
      console.log(error)
      res.status(500).json({message: error.message});
  }
})

//delete task
router.post('/del/:id', async(req, res) => {
  try{
      const {id} = req.params;
      const task = await Task.findByIdAndDelete(id);
      
      if(!task){
          return res.status(404).json({message: `cannot find any task with ID ${id}`})
      }
      res.status(200).redirect('/api/tasks');

  } catch (error){
      res.status(500).json({message: error.message});
  }
})

module.exports = router;
