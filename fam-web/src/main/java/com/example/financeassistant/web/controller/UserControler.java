package com.example.financeassistant.web.controller;

import com.example.financeassistant.model.User;
import com.example.financeassistant.model.exception.InvalidUser;
import com.example.financeassistant.payload.JWTLoginSuccessResponse;
import com.example.financeassistant.payload.LoginRequest;
import com.example.financeassistant.users.security.JwtTokenProvider;
import com.example.financeassistant.service.MapValidationErrorService;
import com.example.financeassistant.service.UserService;
import com.example.financeassistant.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MimeTypeUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import static com.example.financeassistant.users.security.SecurityConstants.TOKEN_PREFIX;

@CrossOrigin
@RestController
@RequestMapping(path = "/users", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class UserControler {
    @Autowired
    private final UserService userService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    @Autowired
    private UserValidator userValidator;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;

    public UserControler(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(bindingResult);
        if(errorMap!=null) return errorMap;
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = SecurityConstants.TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true,jwt));
    }

    @GetMapping
    public List<User> getAllUsers(Principal principal)
    {
        return userService.getAllUsers(principal.getName());
    }

    @GetMapping(params = "term")
    public List<User> searchUsers(@RequestParam String term)
    {
        return userService.searchUser(term);
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable int userId,Principal principal)
    {
        return userService.findById(userId,principal.getName()).orElseThrow(InvalidUser::new);
    }

   /* @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestParam("Name") String Name,
                           @RequestParam("dateOfBirth") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateOfBirth,
                           @RequestParam("Email") String Email)
    {
        User user = userService.createUser(Name,dateOfBirth,Email);
        userValidator.validate(user,null);
        return user;
    }*/

   @PostMapping("/register")
   public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result)
   {
       userValidator.validate(user,result);
       ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
       if(errorMap!=null) return errorMap;

       User user1 = userService.createUser(user);

       return new ResponseEntity<User>(user1, HttpStatus.CREATED);

   }

    @PostMapping("/{uId}")
    public User updateUser(@PathVariable int uId,
                           @RequestParam("userId") int userId,
                           @RequestParam("Name") String Name,
                           @RequestParam("dateOfBirth") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateOfBirth,
                           @RequestParam("Email") String Email)
    {
        return userService.updateUser(uId,Name,dateOfBirth,Email);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id,Principal principal)
    {
        userService.deleteUser(id,principal.getName());
    }

}
