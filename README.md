# Lab 2

Collaboration between Eliza Scharfstein & Ben Kaplan. 

The index page is essentially unchanged from the distribution code, and the gallery page works quite similarly. 

The object page is similar in many ways, but we do some prior filtering/modification of values (people and comments) prior to rendering the HMTL. Specifically, we populate the people array with a blank string to avoid errors if there are no people associated with that object. Within the objects HTML itself, we iterated through all people for display. Additionally, we iterate through the comments so that only those comments for that specific object are passed in to be rendered on the page. Within the artifact HTML itself (we called the file artifact to distinguish from objects), we iterated through each comment for display.

We used a get request and harnessed req.query for adding comments because it was far simpler (for technical implementation) than using a post request. This design decision does mean you have to press back twice to get back to the gallery's page (or even might not work sometimes), but we thought this small sacrifice was worth it given the advantages of using this process of commenting, simplicity of implementation being the key advantage. 

Lastly, we switched from using object id to object number as the api call appear to be failing to the Harvard Arts Museum or was returning the wrong data.