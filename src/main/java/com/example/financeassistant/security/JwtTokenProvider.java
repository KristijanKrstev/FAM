package com.example.financeassistant.security;

import com.example.financeassistant.model.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.example.financeassistant.security.SecurityConstants.EXPIRATION_TIME;
import static com.example.financeassistant.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {
    //Generate the token

    public String generateToken(Authentication authentication){
            User user = (User) authentication.getPrincipal();
            Date now = new Date(System.currentTimeMillis());

            Date expiryDate = new Date(now.getTime()+EXPIRATION_TIME);
            String userId = String.valueOf(user.getId());

            Map<String,Object> claims = new HashMap<>();
            claims.put("id",String.valueOf(user.getId()));
            claims.put("email",user.getEmail());
            claims.put("name",user.getName());

            return Jwts.builder()
                    .setSubject(userId)
                    .setClaims(claims)
                    .setIssuedAt(now)
                    .setExpiration(expiryDate)
                    .signWith(SignatureAlgorithm.HS512, SECRET)
                    .compact();

    }

    //Validate the token
    public boolean validateToken(String token){
            try{
                    Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
                    return true;
            }
            catch (SignatureException ex){
                    System.out.println("Invalid JWT Signature");
            }
            catch (MalformedJwtException ex){
                    System.out.println("Invalid JWT Token");
            }
            catch (ExpiredJwtException ex){
                    System.out.println("Expired JWT token");
            }
            catch (UnsupportedJwtException ex){
                    System.out.println("Unsupported JWT Signature");
            }
            catch (IllegalArgumentException ex){
                    System.out.println("JWT claims strung is empty");
            }
            return false;
    }


    //Get user Id from token

    public int getUserIdFromJWT(String token){
            Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
            String id = (String) claims.get("id");
            return Integer.parseInt(id);
    }
}
