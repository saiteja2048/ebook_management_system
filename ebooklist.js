import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EbookList = () => {
    const [ebooks, setEbooks] = useState([]);

    useEffect(() => {
        // Fetch eBooks from the backend when the component mounts
        const fetchEbooks = async() => {
            try {
                const response = await axios.get('/api/ebooks');
                setEbooks(response.data);
            } catch (error) {
                console.error('Error fetching eBooks:', error);
            }
        };

        fetchEbooks();
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    return ( <
        div >
        <
        h2 > EBook List < /h2> {
            ebooks.length === 0 ? ( <
                p > No eBooks available. < /p>
            ) : ( <
                ul > {
                    ebooks.map((ebook) => ( <
                        li key = { ebook._id } >
                        <
                        h3 > { ebook.title } < /h3> <
                        p > Author: { ebook.author } < /p> <
                        p > Category: { ebook.category } < /p> <
                        p > Description: { ebook.description } < /p> <
                        button onClick = {
                            () => handleDownload(ebook._id) } > Download < /button> <
                        /li>
                    ))
                } <
                /ul>
            )
        } <
        /div>
    );
};

export default EbookList;