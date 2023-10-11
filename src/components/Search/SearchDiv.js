import React, { useState, useEffect } from 'react';
import './style.css';
import styled from 'styled-components';

function SearchDiv({setSearchOpen, places, setLat, setLon, setLevel}) {
	const clickPlace = (lat, lon) => {
		setSearchOpen(false);
		setLat(lat);
		setLon(lon);
	}

	return (
		<div className='container'>
			<div style={{marginTop: "100px", marginLeft: "4%", marginRight: "4%"}}>
				<div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
					{places.map((location, idx) => (
							<div onClick={() => {clickPlace(location.mapY, location.mapX)}} key={idx}>
								<div style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
									<div>
										<Title>{location.placeName}</Title> <br/>
										<Content>{location.address}</Content>
									</div>
									<div>
										<img src={location.image} width="50px" height="50px" style={{borderRadius: "20%", boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 8px 0px"}}/>
									</div>
								</div>
								<div style={{width: "100%", height: "1px", background: "#1C1C1C22", marginTop: "8px"}}></div>
							</div>
					))}
				</div>
			</div>
			<div onClick={() => {setSearchOpen(false)}} style={{backgroundColor: "transparent", height: "100vh", width: "100%", marginTop: "20px"}}>
				{''}
			</div>
		</div>
	);
}

export default SearchDiv;

const Title = styled.span`
	font-size: 16px;
	font-weight: 500;
`;

const Content = styled.span`
	font-size: 10px;
	font-weight: 300;
	margin-top: 5px;
`;
