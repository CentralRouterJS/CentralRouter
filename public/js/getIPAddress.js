const getIpAddress = () => {
    fetch('/api/v1/getip')
        .then( data => data.json() )
        .then( json => {
            let inputfield = document.getElementById('ipinputfield');
            inputfield.value = json.ipaddress;
        })
        .catch( (err) => {
            if(err) 
                console.log('[API] Unable to get IP address from server.');
        });
}