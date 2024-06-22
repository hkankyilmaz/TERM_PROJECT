package edu.sabanciuniv.authservice.repo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;


import edu.sabanciuniv.authservice.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public User save(User user){
        dynamoDBMapper.save(user);
        return user;
    }

    public User getUserById(String id){
        return dynamoDBMapper.load(User.class, id);
    }

}
