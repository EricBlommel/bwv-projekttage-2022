package com.laudert.backend.domain;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;

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
import javax.persistence.GeneratedValue;
import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Entity(name = "Event")
@Table(name = "event")
public class Event {

    @Id
    @Column(name = "id", unique = true, nullable = false, updatable = false)
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "begin_date")
    private Instant beginsAt;

    @Column(name = "description")
    @Length(max = 1000)
    private String description;

    @ManyToOne
    @JoinColumn(
        name = "creator_id",
        referencedColumnName = "id",
        foreignKey = @ForeignKey(
            name = "creator_fk"
        )
    )
    private User creator;

    @ManyToMany
    @JoinTable(
        name = "event_user",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users;

    @OneToMany(
        mappedBy = "event",
        orphanRemoval = true,
        cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
        fetch = FetchType.LAZY
    )
    private Set<Item> items;

    public Event() {
    }

    public Event(UUID id, String name, Instant beginsAt, String description, User creator) {
        this.id = id;
        this.name = name;
        this.beginsAt = beginsAt;
        this.description = description;
        this.creator = creator;
    }

    public Event(String name, Instant beginsAt, String description) {
        this.name = name;
        this.beginsAt = beginsAt;
        this.description = description;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getBeginsAt() {
        return beginsAt;
    }

    public void setBeginsAt(Instant beginsAt) {
        this.beginsAt = beginsAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }
}
