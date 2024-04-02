// EbookList.js
import React, { useState } from 'react';

const EbookList = () => {
    const [ebooks, setEbooks] = useState([
        { id: 1, title: 'Book 1', author: 'Author 1', category: 'Fiction' },
        { id: 2, title: 'Book 2', author: 'Author 2', category: 'Non-Fiction' },
        { id: 3, title: 'Book 3', author: 'Author 3', category: 'Science' }
    ]);

    const [newEbook, setNewEbook] = useState({ title: '', author: '', category: '' });

    const addEbook = () => {
        if (!newEbook.title || !newEbook.author || !newEbook.category) {
            alert('Please fill in all fields.');
            return;
        }
        const nextId = ebooks.length > 0 ? ebooks[ebooks.length - 1].id + 1 : 1;
        setEbooks([...ebooks, { id: nextId, ...newEbook }]);
        setNewEbook({ title: '', author: '', category: '' });
    };

    const deleteEbook = id => {
        setEbooks(ebooks.filter(ebook => ebook.id !== id));
    };

    const updateEbook = (id, updatedEbook) => {
        setEbooks(ebooks.map(ebook =>
            ebook.id === id ? {...ebook, ...updatedEbook } : ebook
        ));
    };

    return ( <
        div >
        <
        h1 > Ebook Management System < /h1> <
        div >
        <
        input type = "text"
        placeholder = "Title"
        value = { newEbook.title }
        onChange = { e => setNewEbook({...newEbook, title: e.target.value }) }
        /> <
        input type = "text"
        placeholder = "Author"
        value = { newEbook.author }
        onChange = { e => setNewEbook({...newEbook, author: e.target.value }) }
        /> <
        input type = "text"
        placeholder = "Category"
        value = { newEbook.category }
        onChange = { e => setNewEbook({...newEbook, category: e.target.value }) }
        /> <
        button onClick = { addEbook } > Add Ebook < /button> <
        /div> <
        div > {
            ebooks.map(ebook => ( <
                div key = { ebook.id }
                className = "ebook" >
                <
                h2 > { ebook.title } < /h2> <
                p > < strong > Author: < /strong> {ebook.author}</p >
                <
                p > < strong > Category: < /strong> {ebook.category}</p >
                <
                button onClick = {
                    () => deleteEbook(ebook.id) } > Delete < /button> <
                button onClick = {
                    () => updateEbook(ebook.id, { title: 'Updated Title' }) } > Update < /button> <
                /div>
            ))
        } <
        /div> <
        /div>
    );
};

export default EbookList;