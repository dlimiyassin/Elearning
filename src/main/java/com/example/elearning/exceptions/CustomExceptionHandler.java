package com.example.elearning.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.Date;

@ControllerAdvice
public class CustomExceptionHandler {

    /* 401 */
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseBody
    public ResponseEntity<ErrorBody> handleUnauthorizedException(UnauthorizedException ex) {
        String status = "Unauthorized";
        Date time = new Date();
        String message = ex.getMessage();
        ErrorBody errorBody = new ErrorBody(status,time,message);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody);
    }

    /* 403 */
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    public ResponseEntity<ErrorBody> handleAccessDeniedException(AccessDeniedException ex) {
        String status = "Access denied";
        Date time = new Date();
        String message = ex.getMessage();
        ErrorBody errorBody = new ErrorBody(status,time,message);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorBody);
    }

    /* 404 */
    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseBody
    public ResponseEntity<ErrorBody> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        String status = "UsernameNotFound";
        Date time = new Date();
        String message = ex.getMessage();
        ErrorBody errorBody = new ErrorBody(status,time,message);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorBody);
    }

    /* 405 - Method Not Supported */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseBody
    public ResponseEntity<ErrorBody> handleMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        String status = "Method Not Supported";
        Date time = new Date();
        String message = ex.getMessage();
        ErrorBody errorBody = new ErrorBody(status, time, message);
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(errorBody);
    }

    /* 500 */
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<ErrorBody> handleGenericException(Exception ex) {
        String status = "Internal server error";
        Date time = new Date();
        String message = ex.getMessage();
        ErrorBody errorBody = new ErrorBody(status,time,message);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
    }

    /* 500 for incorrect endpoint api
    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseBody
    public ResponseEntity<ErrorBody> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        String status = "Not Found";
        Date time = new Date();
        String message = "The requested resource was not found on this server";
        ErrorBody errorBody = new ErrorBody(status, time, message);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
    }
     */
}

