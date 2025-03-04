import { MigrationInterface, QueryRunner } from "typeorm";

import users from './../mock-data/users.mock.json' assert { type: 'json' };
import posts from './../mock-data/posts.mock.json' assert { type: 'json' };

export class Initial1741119049285 implements MigrationInterface {
    name = 'Initial1741119049285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
      
        // Add users to DB
        users.forEach(async (user) => {
          const { name, email, password } = user;
          await queryRunner.query(`INSERT INTO "user"("name", "email", "password") VALUES('${name}', '${email}', '${password}')`);
        });

        // Add posts to DB
        posts.forEach(async (post) => {
          const { title, content } = post;
          await queryRunner.query(`INSERT INTO "post"("title", "content") VALUES('${title}', '${content}')`);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
