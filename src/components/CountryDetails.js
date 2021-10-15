import React from 'react';
import './CountryDetails.scss';
import { useSelector, useDispatch } from 'react-redux';
import { clearCountry } from '../redux/actions/country';
import { motion } from 'framer-motion';

export const CountryDetails = () => {
    const dispatch = useDispatch();
    const country = useSelector(state => state.country.countryDetails[0]);

    const closeHandleClick = (e) => {
        // overlaybox click outside to Exit
        if (e.target.classList.contains('overlaybox') && !e.target.classList.contains('country-details-wrapper')) {
            dispatch(clearCountry());
        }
    }

    const buttonHandleClick = (e) => {
        dispatch(clearCountry());
    }

    // Country Details
    const countryInfo = [
        {
            "label": "Capital City",
            "value": country && country.capital ? country.capital : '-',
            "icon": "home_work",
        }, {
            "label": "Population",
            "value": country && country.population ? country.population : '-',
            "icon": "groups",
        }, {
            "label": "Alpha2Code",
            "value": country && country.alphaCode ? country.alphaCode : '-',
            "icon": "tag",
        }
    ]

    // Animations
    const infoVariants = {
        hidden: {
            opacity: 0,
            transition: {
                ease: "easeOut",
                duration: 0.4,
            }
        },
        visible: {
            opacity: 1,
            transition: {
                ease: "easeIn",
                duration: 0.4,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                ease: "easeOut",
                duration: 0.4,
            }
        }
    };

    return (
        <motion.div className="overlaybox" onClick={closeHandleClick}
            initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {country ?
                <div className="country-details-wrapper">
                    <span className="back-btn" type="button" alt="Back" onClick={buttonHandleClick}>
                        <i className="material-icons-round md-24">arrow_back</i>
                    </span>
                    <motion.div className="flag" variants={infoVariants} initial="hidden" animate="visible" exit="exit"
                        style={{ background: "url(" + country.flag + ") 50% 50% / cover" }}>
                    </motion.div>
                    <motion.h2 variants={infoVariants} initial="hidden" animate="visible" exit="exit">{country.name}</motion.h2>
                    <div className="info-wrapper">
                        {countryInfo && countryInfo.map((countryInfo, num) => {
                            return <motion.div key={`${num}-${countryInfo.label}`} className="info" variants={infoVariants} initial="hidden" animate="visible" exit="exit">
                                <i className="material-icons-round md-32">{countryInfo.icon}</i>
                                <label>{countryInfo.label}</label>
                                <p className="info-value">{countryInfo.value}</p>
                            </motion.div>
                        })}
                    </div>

                </div>
                :
                <p>No information</p>
            }
        </motion.div>
    )
}
