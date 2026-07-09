import sql from "../configs/db.js";

// Get current user's creations
export const getUserCreation = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations = await sql`
      SELECT *
      FROM creations
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    res.json({
      success: true,
      creations,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get all published creations
export const getPublishedCreation = async (req, res) => {
  try {
    const creations = await sql`
      SELECT *
      FROM creations
      WHERE publish = true
      ORDER BY created_at DESC
    `;

    res.json({
      success: true,
      creations,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Like / Unlike creation
export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const [creation] = await sql`
      SELECT *
      FROM creations
      WHERE id = ${id}
    `;

    if (!creation) {
      return res.json({
        success: false,
        message: "Creation not found",
      });
    }

    const currentLikes = creation.likes || [];
    const user = userId.toString();

    let updatedLikes;

    if (currentLikes.includes(user)) {
      updatedLikes = currentLikes.filter((item) => item !== user);
    } else {
      updatedLikes = [...currentLikes, user];
    }

    await sql`
      UPDATE creations
      SET likes = ${updatedLikes}
      WHERE id = ${id}
    `;

    res.json({
      success: true,
      message: "Updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};