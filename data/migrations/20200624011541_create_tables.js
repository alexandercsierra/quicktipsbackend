exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('name', 128);
        tbl.string('email', 128).notNullable().index();
        tbl.string('username', 128).notNullable().index();
        tbl.string('password', 256).notNullable();
        tbl.boolean('creator').notNullable().defaultTo(false);
    })

    .createTable('guides', tbl=>{
        tbl.increments();
        tbl.string('title', 128).notNullable().index();
        tbl.string('date', 128).notNullable().index();
        tbl.string('content').notNullable();
        tbl.string('category', 128).notNullable();
        tbl.specificType('images', 'text ARRAY');
        tbl.integer('likes').notNullable().defaultTo(0);

        //foreign key
        tbl.integer('author')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .index();
    })

    .createTable('guideReviews', tbl=>{
        tbl.increments();
        //foreign keys
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .index();
            
        tbl.integer('guide_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('guides')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .index();

        tbl.string('rating').notNullable().defaultTo(0);
        tbl.string('comment');
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('guideReviews')
        .dropTableIfExists('guides')
        .dropTableIfExists('users')
};