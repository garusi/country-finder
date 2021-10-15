import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries } from '../redux/actions/countries';
import { setCountry } from '../redux/actions/country';
import { CountryDetails } from './CountryDetails';
import AlphabeticalSidebar from './AlphabeticalSidebar';
import { motion, AnimatePresence } from 'framer-motion';

import './CountriesList.scss';

const CountriesList = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries.countries);
    const selectedCountry = useSelector(state => state.country.selectedCountry);
    const loading = useSelector(state => state.countries.loading);
    const error = useSelector(state => state.countries.error);
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    // Fetch new countries every 15 seconds
    const fetchDataHandler = () => {
        dispatch(getCountries());
        setInterval(() => {
            dispatch(getCountries());
        }, 15000);
    }

    // Check if country is first of a letter
    function isFirstOfLetter(country, cn) {
        const nextCountry = countries[cn - 1]
        if (nextCountry && cn > 0 && cn < countries.length && nextCountry.name.charAt(0).toLowerCase() === country.charAt(0).toLowerCase()) {
            return false
        } else {
            return true
        }
    }

    // Animations
    const loadingContainerVariants = {
        hidden: {
            opacity: 0,
            x:50,
        },
        visible: {
            x:0,
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.05,
            },
        },
    };
    const loadingItemVariants = {
        hidden: {
            y: "100%",
            x: 0,
            opacity: 0,
            transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.6
            },
        },
        visible: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.6
            },
        }
    }

    return (
        <div className="countries-list-wrapper">
            <AlphabeticalSidebar alphabet={alphabet} />
            <div className="project-info-wrapper">
                <button onClick={fetchDataHandler}>Get Countries</button>
            </div>
            {error && !loading && <p id="err">{error}</p>}

            <AnimatePresence>{selectedCountry && <CountryDetails />}</AnimatePresence>
            <motion.ul className="countries-list" variants={loadingContainerVariants} initial="hidden" animate="visible" exit="hidden">
                {countries.length >= 0 && countries.map((country, cn) => {
                    return (
                        <motion.li
                        className={`cname${isFirstOfLetter(country.name, cn) ? ' FL FirstLetter-' + country.name.charAt(0).toLowerCase() : ''}`}
                        style={{height: 64}}
                        key={cn}
                        data-content={country.name.charAt(0).toLowerCase()}
                        variants={loadingItemVariants}
                        id={`${isFirstOfLetter(country.name, cn) ? 'ref-'+country.name.charAt(0).toLowerCase() : ''}`}>
                            <p onClick={() => dispatch(setCountry(country.name))}>
                                {country.name}
                            </p>
                        </motion.li>
                    )
                })}
            </motion.ul>
            <div className="status-wrapper">
            {countries.length > 0 && <p className="total">Total Countries: {countries.length}</p>}
            {loading && <p className="loading">Loading...</p>}
            </div>

        </div>
    )
}

export default CountriesList;