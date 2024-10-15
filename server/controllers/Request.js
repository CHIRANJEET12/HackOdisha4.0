// controllers/Request.js
import Request from '../models/request.js'; // Import the Request model

// Send a friend request
export const sendRequest = async (req, res) => {
    const { senderId, receiverId, productId } = req.body;

    // Validate input
    if (!senderId || !receiverId) {
        return res.status(400).json({ error: 'Sender ID and Receiver ID are required.' });
    }

    try {
        const newRequest = new Request({ senderId, receiverId, productId });
        await newRequest.save();
        res.status(201).json({ message: 'Request sent!' }); // Use 201 for resource creation
    } catch (error) {
        console.error('Error sending request:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' }); // More generic error message
    }
};

// Get pending requests for a user
export const getPendingRequests = async (req, res) => {
    const { userId } = req.params;

    try {
        const requests = await Request.find({
            receiverId: userId,
            status: 'pending',
        }).populate('senderId', 'name'); // Populates sender's name
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching pending requests:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' }); // More generic error message
    }
};

// Respond to a friend request
export const respondToRequest = async (req, res) => {
    const { requestId, status } = req.body; // status can be 'accepted' or 'rejected'

    // Validate input
    if (!requestId || !status) {
        return res.status(400).json({ error: 'Request ID and status are required.' });
    }

    try {
        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { status },
            { new: true } // Return the updated document
        );

        if (!updatedRequest) {
            return res.status(404).json({ error: 'Request not found.' });
        }

        res.status(200).json({ message: `Request ${status} successfully.` });
    } catch (error) {
        console.error('Error responding to request:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' }); // More generic error message
    }
};
