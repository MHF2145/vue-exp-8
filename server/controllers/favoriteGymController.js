const knex = require('knex')(require('../knexfile').development);

exports.addFavoriteGym = async (req, res) => {
  const { gymName, gymLeader, region } = req.body;
  const userId = req.user.id; 

  try {
    // Menambahkan gym ke daftar favorit
    await knex('favorite_gyms').insert({
      user_id: userId,
      gym_name: gymName,
      gym_leader: gymLeader,
      region: region,
    });

    res.json({ message: 'Gym added to favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding gym to favorites', error: err.message });
  }
};

exports.getFavoriteGyms = async (req, res) => {
  const userId = req.user.id;

  try {
    const favoriteGyms = await knex('favorite_gyms')
      .where('user_id', userId)
      .select('id', 'gym_name', 'gym_leader', 'region', 'added_at');

    if (favoriteGyms.length === 0) {
      return res.status(404).json({ message: 'No favorite gyms found' });
    }

    res.json({ gyms: favoriteGyms });
  } catch (err) {
    console.error('Error fetching favorite gyms:', err);
    res.status(500).json({ message: 'Error fetching favorite gyms', error: err.message });
  }
};

exports.updateFavoriteGym = async (req, res) => {
  const { gymId } = req.params;
  const { gymName, gymLeader, region } = req.body;
  const userId = req.user.id;

  try {
    // Memeriksa apakah gym favorit ini milik pengguna
    const gym = await knex('favorite_gyms')
      .where({ id: gymId, user_id: userId })
      .first();

    if (!gym) {
      return res.status(404).json({ message: 'Gym not found in your favorites' });
    }

    // Memperbarui gym favorit
    await knex('favorite_gyms')
      .where({ id: gymId, user_id: userId })
      .update({
        gym_name: gymName,
        gym_leader: gymLeader,
        region: region,
      });

    res.json({ message: 'Gym updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating gym', error: err.message });
  }
};

exports.removeFavoriteGym = async (req, res) => {
  const { gymId } = req.params;
  const userId = req.user.id;

  try {
    const gym = await knex('favorite_gyms')
      .where({ id: gymId, user_id: userId })
      .first();

    if (!gym) {
      return res.status(404).json({ message: 'Gym not found in your favorites' });
    }

    await knex('favorite_gyms')
      .where({ id: gymId, user_id: userId })
      .del();

    res.json({ message: 'Gym removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing gym from favorites', error: err.message });
  }
};
