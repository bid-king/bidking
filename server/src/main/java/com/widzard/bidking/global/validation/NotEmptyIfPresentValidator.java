package com.widzard.bidking.global.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NotEmptyIfPresentValidator implements
    ConstraintValidator<NotEmptyIfPresent, CharSequence> {

    @Override
    public void initialize(NotEmptyIfPresent constraintAnnotation) {
    }

    @Override
    public boolean isValid(CharSequence value, ConstraintValidatorContext context) {
        return value == null || value.length() == 0 || (value.length() >= 8
            && value.length() <= 16);
    }
}