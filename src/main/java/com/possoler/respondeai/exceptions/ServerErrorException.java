package com.possoler.respondeai.exceptions;

public class ServerErrorException extends RuntimeException{

    public ServerErrorException(String message)
    {
        super(message);
    }
}
