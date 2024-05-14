import React from 'react'
import BusinessHeading from "../util/BusinessHeading";
import {useGetBusinessReviewsQuery} from "../../redux/services/businessAPI";
import {useSelector} from "react-redux";
import CustomSpinner, {DISPLAY, SPINNERS} from "../util/customSpinner/CustomSpinner";
import {Image, List, Row, Space} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation, faPhone, faReply} from "@fortawesome/free-solid-svg-icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {GET_BUSINESS} from "../../redux/api_url";
import "./businessReview.css"
import GetRating from "../util/GetRating";
import CustomPopover from "../util/CustomPopover";
import NoDataGIF from "../util/NoDataGIF";

const BASE_URL = process.env.BASE_API_URL;

const BusinessReview = () => {
    const businessId = useSelector((state) => state.business.businessId);

    const {
        data: reviews,
        isLoading: loadingReviews
    } = useGetBusinessReviewsQuery({businessId: businessId})
    if (loadingReviews) {
        return <CustomSpinner spinner={SPINNERS.SKELETON} display={DISPLAY.AREA}/>
    }

    return (

        <Row>
            <BusinessHeading heading={"Reviews"}/>
            <List
                itemLayout="vertical"
                style={{
                    width: '100%',
                    marginTop: 50
                }}
                size="large"
                dataSource={reviews}
                renderItem={(review) => (
                    <ReviewCards
                        item={review}
                        businessId={businessId}
                    />)}
                locale={{
                    emptyText: <NoDataGIF message={"No Review available."} />
                }}
            />
        </Row>

    )

}
const ReviewCards = ({item, businessId}) => {
    const screens = useBreakpoint();
    const cardMargin = screens.md || screens.lg || screens.xl || screens.xxl ? 50 : 12;

    return <List.Item
        className={"item-card"}
        style={{
            marginRight: cardMargin,
            marginLeft: cardMargin
        }}
        colStyle={{
            border: '1px solid red'
        }}
        actions={[
            <Space
                style={{
                    cursor: 'pointer'
                }}
                title={item.email}
                onClick={() => {
                    window.location.href = `mailto:${item.email}`
                }}>
                <FontAwesomeIcon icon={faReply} /> Reply
            </Space>,
            <Space
                title={item.phone}
                style={{
                    cursor: item.phone ? 'pointer' : 'not-allowed'
                }}
                onClick={() => {
                    if (item.phone) {
                        window.location.href = `tel:${item.phone}`
                    }
                }}>
                <FontAwesomeIcon icon={faPhone}  /> Call
            </Space>,
            <Space>
                {item.date}
            </Space>
        ]}
        extra={
            <Image
                width={200}
                alt={item.fullName}
                src={`${BASE_URL}${GET_BUSINESS}free/${businessId}/image/${item.imageId}`}
                style={{
                    borderRadius: '5px'
                }}
                loading={"lazy"}
            />}
        key={item.id}
    >
        <List.Item.Meta
            title={item.fullName}
            description={
                <GetRating readOnly={true} initialRating={item.rating} onSelect={() => {}}/>}
        />
        <p style={{fontSize: 'large'}}>{item.comment}</p>
    </List.Item>
}

export default BusinessReview;
