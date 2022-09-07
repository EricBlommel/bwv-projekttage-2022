package com.laudert.backend.db;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.Instant;
import java.util.Set;

@Entity(name = "Event")
@Table(name = "event")
public class EventEntity {

    @Id
    @Column(name = "id", unique = true, nullable = false, updatable = false)
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "begin_date")
    private Instant beginsAt;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(
        name = "creator_id",
        nullable = false,
        referencedColumnName = "id",
        foreignKey = @ForeignKey(
            name = "creator_fk"
        )
    )
    private UserEntity creator;

    @ManyToMany
    @JoinTable(
        name = "event_user",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<UserEntity> users;

    @OneToMany(
        mappedBy = "event",
        orphanRemoval = true,
        cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
        fetch = FetchType.LAZY
    )
    private Set<ItemEntity> items;
}
