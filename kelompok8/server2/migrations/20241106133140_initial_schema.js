/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username', 50).notNullable().unique();
      table.string('email', 100).notNullable().unique();
      table.string('password_hash', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('favorite_pokemons', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('pokemon_id').notNullable(); // PokeAPI Pokemon ID
      table.timestamp('added_at').defaultTo(knex.fn.now());
    })
    .createTable('favorite_trainers', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('trainer_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('added_at').defaultTo(knex.fn.now());
      table.unique(['user_id', 'trainer_id']); // Prevent duplicate entries
    })
    .createTable('top_moves', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('move_id').notNullable(); // PokeAPI move ID
      table.string('move_name', 50).notNullable();
      table.string('move_type', 20).notNullable();
      table.timestamp('added_at').defaultTo(knex.fn.now());
    })
    .createTable('top_items', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('item_id').notNullable(); // PokeAPI item ID
      table.string('item_name', 50).notNullable();
      table.string('item_category', 50).notNullable();
      table.timestamp('added_at').defaultTo(knex.fn.now());
    })
    .createTable('favorite_gyms', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.string('gym_name', 100).notNullable();
      table.string('gym_leader', 100).notNullable();
      table.string('region', 50).notNullable();
      table.timestamp('added_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('favorite_gyms')
      .dropTableIfExists('top_items')
      .dropTableIfExists('top_moves')
      .dropTableIfExists('favorite_trainers')
      .dropTableIfExists('favorite_pokemons')
      .dropTableIfExists('users');
};
