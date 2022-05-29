package com.digicert.libraryapi.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {

    public static <T> String toJson(T t) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(t);
    }

    public <R> R jsonStringToObject(String s, Class<R> clazz) throws JsonProcessingException {
        return new ObjectMapper().readValue(s, clazz);
    }

    public static <T> String toJsonPretty(T t) throws JsonProcessingException {
        return new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(t);
    }
}