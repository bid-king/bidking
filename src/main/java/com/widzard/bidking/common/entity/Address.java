package com.widzard.bidking.common.entity;

import javax.persistence.Embeddable;
import java.util.Objects;

@Embeddable
public class Address {


    private String street; // 도로명 주소
    private String details; // (상세주소)
    private String zipCode; //우편번호

    protected Address() {
    }

    public Address(String street, String details, String zipCode) {
        this.street = street;
        this.details = details;
        this.zipCode = zipCode;
    }

    public String getStreet() {
        return street;
    }

    public String getDetails() {
        return details;
    }

    public String getZipCode() {
        return zipCode;
    }

    private void setStreet(String street) {
        this.street = street;
    }

    private void setDetails(String details) {
        this.details = details;
    }

    private void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(getStreet(), address.getStreet()) && Objects.equals(getDetails(), address.getDetails()) && Objects.equals(getZipCode(), address.getZipCode());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getStreet(), getDetails(), getZipCode());
    }
}