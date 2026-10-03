/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.sql(`
        CREATE TABLE flag_environments (
            flag_id UUID NOT NULL REFERENCES flags(id) ON DELETE CASCADE,
            environment_id UUID NOT NULL REFERENCES environments(id) ON DELETE CASCADE,
            enabled BOOLEAN NOT NULL DEFAULT false,
            rollout_percentage INTEGER NOT NULL DEFAULT 100 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
            created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            PRIMARY KEY (flag_id, environment_id)
            )
    `);
    pgm.sql(`
        CREATE INDEX flag_environments_environment_id_idx
        ON flag_environments (environment_id)
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        DROP TABLE flag_environments
        `)
};
