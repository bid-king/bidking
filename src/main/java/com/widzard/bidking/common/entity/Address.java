package com.widzard.bidking.common.entity;

import javax.persistence.Embeddable;
import java.util.Objects;

@Embeddable
public class Address {


    private String sido; // (시도)
    private String gugun; // (구군)
    private String addressDetails; // (상세주소)
    private Integer zipcode; //우편번호  //TODO String으로 바꿈

    protected Address() {
    }

    public Address(String sido, String gugun, String addressDetails, Integer zipcode) {
        this.sido = sido;
        this.gugun = gugun;
        this.addressDetails = addressDetails;
        this.zipcode = zipcode;
    }


    public String getSido() {
        return sido;
    }

    private void setSido(String sido) {
        this.sido = sido;
    }

    public String getGugun() {
        return gugun;
    }

    private void setGugun(String gugun) {
        this.gugun = gugun;
    }

    public String getAddressDetails() {
        return addressDetails;
    }

    private void setAddressDetails(String addressDetails) {
        this.addressDetails = addressDetails;
    }

    public Integer getZipcode() {
        return zipcode;
    }

    private void setZipcode(Integer zipcode) {
        this.zipcode = zipcode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Address address = (Address) o;
        return Objects.equals(getSido(), address.getSido()) && Objects.equals(
                getGugun(), address.getGugun()) && Objects.equals(getAddressDetails(),
                address.getAddressDetails()) && Objects.equals(getZipcode(),
                address.getZipcode());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSido(), getGugun(), getAddressDetails(), getZipcode());
    }
}