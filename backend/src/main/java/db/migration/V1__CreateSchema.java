package db.migration;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

public class V1__CreateSchema extends BaseJavaMigration {

    @Override
    public void migrate(Context context)  {
        final JdbcTemplate jdbcTemplate = new JdbcTemplate(new SingleConnectionDataSource(context.getConnection(), true));

        jdbcTemplate.execute(
            "create table event(\n" +
            "  uuid\t\t\tvarchar(100) primary key,\n" +
            "  name\t\t\tvarchar(64),\n" +
            "  begin_date\tdatetime,\n" +
            "  description \tvarchar(450),\n" +
            "  creator \t\tvarchar(100),\n" +
            "  foreign key (creator) references user(uuid)\n" +
            ") engine = InnoDB default charset = utf8mb4 collate = utf8mb4_bin;"
                            );

        jdbcTemplate.execute(
            "create table user(\n" +
            "  uuid\t\t\tvarchar(100) primary key,\n" +
            "  email\t\t\tvarchar(100),\n" +
            "  firstname\t\tvarchar(100),\n" +
            "  lastname\t\tvarchar(100),\n" +
            "  password\t\tvarchar(100),\n" +
            ") engine = InnoDB default charset = utf8mb4 collate = utf8mb4_bin;"
                            );

        jdbcTemplate.execute(
            "create table item(\n" +
            "  uuid\t\t\tvarchar(100) primary key,\n" +
            "  name\t\t\tvarchar(100),\n" +
            "  user_id\t\tvarchar(100)\n" +
            ") engine = InnoDB default charset = utf8mb4 collate = utf8mb4_bin;\n"
                            );

        jdbcTemplate.execute(
            "create table event_user(\n" +
            "    event_id varchar(100) not null,\n" +
            "    user_id varchar(100) not null,\n" +
            "    primary key(event_id, user_id),\n" +
            "    foreign key (event_id) references event (uuid),\n" +
            "    foreign key (user_id) references user (uuid)\n" +
            ") engine = InnoDB default charset = utf8mb4 collate = utf8mb4_bin;"
                            );

        jdbcTemplate.execute(
            "create table event_item(\n" +
            "    event_id varchar(100) not null,\n" +
            "    item_id varchar(100) not null,\n" +
            "    primary key(event_id, item_id),\n" +
            "    foreign key (event_id) references event (uuid),\n" +
            "    foreign key (item_id) references item (uuid)\n" +
            ") engine = InnoDB default charset = utf8mb4 collate = utf8mb4_bin;"
                            );
    }
}
