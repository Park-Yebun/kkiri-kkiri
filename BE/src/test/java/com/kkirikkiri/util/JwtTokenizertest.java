package com.kkirikkiri.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@SpringBootTest
public class JwtTokenizertest {

    @Value("${jwt.secretKey}") // application.yml파일의 jwt: secretKey: 값
    String accessSecret; // "12345678901234567890123456789012"
    public final Long ACCESS_TOKEN_EXPIRE_COUNT = 30 * 60 * 1000L; // 60 * 1000 * 30 // 30분

    @Test
    public void createToken() throws Exception{ // JWT 토큰을 생성.
        String loginId = "user01";
        List<String> roles = List.of("ROLE_USER"); // [ "ROLE_USER" ]
        Long id = 1L;
        Claims claims = Jwts.claims().setSubject(loginId); // JWT 토큰의 payload에 들어갈 내용(claims)을 설정.
        // claims -- sub -- email
        //        -- roles -- [ "ROLE_USER" ]
        //        -- userId -- 1L
        claims.put("roles", roles);
        claims.put("userId", id);

        // application.yml파일의 jwt: secretKey: 값
        byte[] accessSecret = this.accessSecret.getBytes(StandardCharsets.UTF_8);

        // JWT를 생성하는 부분.
        String JwtToken = Jwts.builder() // builder는 JwtBuilder를 반환. Builder패턴.
                .setClaims(claims) // claims가 추가된 JwtBuilder를 리턴.
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + this.ACCESS_TOKEN_EXPIRE_COUNT)) // 현재시간으로부터 30분뒤에 만료.
                .signWith(Keys.hmacShaKeyFor(accessSecret)) // 결과에 서명까지 포함시킨 JwtBuilder리턴.
                .compact();

        System.out.println(JwtToken);
    }


    @Test
    public void parseToken() throws Exception{
        byte[] accessSecret = this.accessSecret.getBytes(StandardCharsets.UTF_8);
        String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMDEiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcklkIjoxLCJpYXQiOjE3MTAxNDM0ODYsImV4cCI6MTcxMDE0NTI4Nn0.3Kci_ksJrkfeExc-iiMcPsIZZ3dd_wbOpfJMhpECK0o";

        Claims claims = Jwts.parserBuilder() // JwtParserBuilder를 반환.
                .setSigningKey(Keys.hmacShaKeyFor(accessSecret))
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
        System.out.println(claims.getSubject());
        System.out.println(claims.get("roles"));
        System.out.println(claims.get("userId"));
        System.out.println(claims.getIssuedAt());
        System.out.println(claims.getExpiration());
    }
}
