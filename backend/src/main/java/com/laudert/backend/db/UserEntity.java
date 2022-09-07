package com.laudert.backend.db;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @Column(name = "id", unique = true, nullable = false, updatable = false)
    private String id;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @ManyToMany(mappedBy = "users")
    private Set<EventEntity> events;

    @OneToMany(
        mappedBy = "user",
        orphanRemoval = true,
        cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
        fetch = FetchType.LAZY
    )
    private Set<ItemEntity> items;
}
