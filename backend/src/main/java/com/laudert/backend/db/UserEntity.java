package com.laudert.backend.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @Column(name = "uuid", unique = true, nullable = false, updatable = false)
    private String uuid;

    @Column(name = "name")
    private String email;

    @Column(name = "name")
    private String username;

    @Column(name = "name")
    private String password;

    public UserEntity() {
    }

    public UserEntity(String uuid, String email, String username, String password) {
        this.uuid = uuid;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
