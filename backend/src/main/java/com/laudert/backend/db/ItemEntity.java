package com.laudert.backend.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "item")
public class ItemEntity {

    @Id
    @Column(name = "id", unique = true, nullable = false, updatable = false)
    private String id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(
        name = "event_id",
        referencedColumnName = "id",
        foreignKey = @ForeignKey(
            name = "event_item_fk"
        )
    )
    private EventEntity event;

    @ManyToOne
    @JoinColumn(
        name = "user_id",
        referencedColumnName = "id",
        foreignKey = @ForeignKey(
            name = "user_item_fk"
        )
    )
    private UserEntity user;
}
