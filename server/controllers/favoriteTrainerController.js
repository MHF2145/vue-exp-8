const knex = require('knex')(require('../knexfile').development);

exports.addFavoriteTrainer = async (req, res) => {
  const { trainer_id } = req.body;  
  const userId = req.user.id;

  // console.log("Received trainerId:", trainer_id); 

  try {
    // Memastikan trainer_id bukan user yang sama dengan user yang sedang login
    if (trainer_id === userId) {
      return res.status(400).json({ message: "You can't add yourself as a favorite trainer" });
    }

    // Periksa apakah trainer_id valid (ada di tabel users)
    const trainerExists = await knex('users').where('id', trainer_id).first();
    if (!trainerExists) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    // Menambahkan favorite trainer ke tabel favorite_trainers
    await knex('favorite_trainers').insert({
      user_id: userId,
      trainer_id: trainer_id,
      added_at: knex.fn.now(),
    });

    res.json({ message: 'Trainer added to favorites' });
  } catch (err) {
    // console.error('Error adding favorite trainer:', err);
    res.status(500).json({ message: 'Error adding trainer to favorites', error: err.message });
  }
};


exports.getFavoriteTrainers = async (req, res) => {
  const userId = req.user.id;

  try {
    const favoriteTrainers = await knex('favorite_trainers')
      .join('users as trainers', 'favorite_trainers.trainer_id', '=', 'trainers.id')
      .where('favorite_trainers.user_id', userId)
      .select('trainers.id', 'trainers.username', 'favorite_trainers.added_at'); 

    if (favoriteTrainers.length === 0) {
      return res.status(404).json({ message: 'No favorite trainers found' });
    }

    res.json({ trainers: favoriteTrainers });
  } catch (err) {
    // console.error('Error fetching favorite trainers:', err);
    res.status(500).json({ message: 'Error fetching favorite trainers', error: err.message });
  }
};



exports.updateFavoriteTrainer = async (req, res) => {
  const { trainerId } = req.params;
  const { newTrainerId } = req.body; 
  const userId = req.user.id;

  try {
    // Memeriksa apakah trainer favorit ini milik pengguna
    const trainer = await knex('favorite_trainers')
      .where({ trainer_id: trainerId, user_id: userId })
      .first();

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found in your favorites' });
    }

    // Memperbarui trainer favorit
    await knex('favorite_trainers')
      .where({ trainer_id: trainerId, user_id: userId })
      .update({ trainer_id: newTrainerId });

    res.json({ message: 'Favorite trainer updated successfully' });
  } catch (err) {
    // console.error('Error updating favorite trainer:', err);
    res.status(500).json({ message: 'Error updating favorite trainer', error: err.message });
  }
};

exports.removeFavoriteTrainer = async (req, res) => {
  const { trainerId } = req.params;
  const userId = req.user.id;

  try {
    const trainer = await knex('favorite_trainers')
      .where({ trainer_id: trainerId, user_id: userId })
      .first();

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found in your favorites' });
    }

    await knex('favorite_trainers')
      .where({ trainer_id: trainerId, user_id: userId })
      .del();

    res.json({ message: 'Trainer removed from favorites' });
  } catch (err) {
    // console.error('Error removing favorite trainer:', err);
    res.status(500).json({ message: 'Error removing trainer from favorites', error: err.message });
  }
};
