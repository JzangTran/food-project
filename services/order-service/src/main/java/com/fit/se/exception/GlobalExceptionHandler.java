package com.fit.se.exception;

import com.fit.se.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(404).body(ApiResponse.builder()
                .success(false)
                .message(ex.getMessage())
                .data(null)
                .build());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> handleRuntime(RuntimeException ex) {
        return ResponseEntity.badRequest().body(ApiResponse.builder()
                .success(false)
                .message(ex.getMessage())
                .data(null)
                .build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(err -> err.getField() + " " + err.getDefaultMessage())
                .orElse("Du lieu khong hop le");

        return ResponseEntity.badRequest().body(ApiResponse.builder()
                .success(false)
                .message(message)
                .data(null)
                .build());
    }
}