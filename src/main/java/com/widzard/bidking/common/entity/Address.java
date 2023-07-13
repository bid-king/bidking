package com.widzard.bidking.common.entity;

import javax.persistence.Embeddable;
import java.util.Objects;

@Embeddable
public class Address {


    private String street; // 도로명 주소
    private String details; // (상세주소)
    private String zipcode; //우편번호

    protected Address() {
    }

    public Address(String street, String details, String zipcode) {
        this.street = street;
        this.details = details;
        this.zipcode = zipcode;
    }

    public String getStreet() {
        return street;
    }

    public String getDetails() {
        return details;
    }

    public String getZipcode() {
        return zipcode;
    }

    private void setStreet(String street) {
        this.street = street;
    }

    private void setDetails(String details) {
        this.details = details;
    }

    private void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(getStreet(), address.getStreet()) && Objects.equals(getDetails(), address.getDetails()) && Objects.equals(getZipcode(), address.getZipcode());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getStreet(), getDetails(), getZipcode());
    }
}