package com.laudert.backend.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "event")
public class EventEntity {

    @Id
    @Column(name = "uuid", unique = true, nullable = false, updatable = false)
    private String uuid;

    @Column(name = "name")
    private String name;

    @Column(name = "begin_date")
    private Instant beginsAt;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity creator;
}
