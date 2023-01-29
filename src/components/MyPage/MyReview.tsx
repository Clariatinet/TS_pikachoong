import styled from 'styled-components';
import { db } from '../../common/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Item } from '../../types/MapInterface';
import { useAppSelector } from '../../hooks/useRedux';

const MyReview = () => {
  const user = useAppSelector((state) => state.login.user);
  const [myReview, setMyReview] = useState<Item[]>([]);

  const reviewHandler = async () => {
    const q = query(
      collection(db, 'reviews'),
      where('uid', '==', user?.uid),
      orderBy('createdTime', 'desc'),
    );
    const reviews: Item[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => reviews.push({ ...doc.data() }));
    setMyReview(reviews);
  };

  useEffect(() => {
    reviewHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <StyledView>
      {myReview.length === 0 ? (
        <StyledNullDiv>
          <StyledNullText>
            <h3>어디로 가야할지 모르겠어요...</h3>
            <h4>나 진짜 길 찾는데...</h4>
            <h5>정말인데...</h5>
            <h6>데...</h6>
            <p>..</p>
            <p>.</p>
          </StyledNullText>
          <StyledNullImg src={require('../../assets/pointer.png')} alt="" />
        </StyledNullDiv>
      ) : (
        myReview.map((x) => {
          return (
            <StyledReview>
              <StyledReviewBox key={x.reviewId}>
                <StyledReviewBoxH3>{x.statNm}</StyledReviewBoxH3>
                <div>
                  {'⭐'.repeat(Number(x.reviewRating))} | {x.createdTime}
                </div>
                <h4>{x.review}</h4>
              </StyledReviewBox>
            </StyledReview>
          );
        })
      )}
    </StyledView>
  );
};

export default MyReview;

const StyledView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: -1;
    position: relative;
    /* bottom: 7rem; */
    /* left: 5rem; */
  }
`;

const StyledNullDiv = styled.div`
  background-color: rgb(217, 217, 217, 0.2);
  padding: 0.1rem 1.5rem;
  margin: 1rem;
  width: 30rem;
  @media screen and (max-width: 768px) {
    width: 20rem;
    height: 22.5rem;
    overflow: hidden;
  }
`;

const StyledNullText = styled.div`
  text-align: center;
  @media screnn and (max-width: 768px) {
    height: 30rem;
  }
`;

const StyledNullImg = styled.img`
  width: 10rem;
  object-fit: cover;
  justify-content: center;
  position: relative;
  left: 9.5rem;
  bottom: 1rem;
  z-index: -10;
  @media screen and (max-width: 768px) {
    position: relative;
    left: 5rem;
  }
`;

const StyledReview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 23rem;
    height: 12rem;
    overflow: hidden;
  }
`;

const StyledReviewBox = styled.div`
  background-color: rgb(217, 217, 217, 0.2);
  padding: 0.1rem 1.5rem;
  margin: 1rem;
  width: 30rem;
  height: 12rem;
  position: relative;
  @media screen and (max-width: 768px) {
    position: relative;
    left: 5rem;
  }
`;

const StyledReviewBoxH3 = styled.h3`
  @media screen and (max-width: 768px) {
    font-size: medium;
  }
`;
