const crearTask = async (req, res) => {
    const task = new TaskScheme(req.body);
  
    try {
      task.user = req.uid;
      const saved = await task.save();
      res.json({
        ok: true,
        task: saved
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        task: 'Internal Error'
      });
    }
  };
  
  const listarTasks = async (req, res) => {
    const tasks = await Task.find().populate('user', 'name');
  
    try {
      res.status(200).json({
        ok: true,
        tasks,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error Interno',
      });
    }
  };
  
  const actualizarTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description }, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({
          ok: false,
          msg: 'Tarea no encontrada'
        });
      }
  
      res.json({
        ok: true,
        task: updatedTask
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: 'Error interno al actualizar la tarea'
      });
    }
  };
  
  const eliminarTask = async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({
          ok: false,
          msg: 'Tarea no encontrada'
        });
      }
  
      res.json({
        ok: true,
        msg: 'Tarea eliminada exitosamente'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: 'Error interno al eliminar la tarea'
      });
    }
  };
  
  module.exports = {
    crearTask,
    listarTasks,
    actualizarTask,
    eliminarTask
  };
  
  