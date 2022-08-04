class RegisterController {
  constructor(registerServices) {
    this.registerServices = registerServices;
  }
  async getRecords(req, res) {
    res.send("vamo bien");
    // try {
    //   const response = await this.registerServices.getRecords();
    //   const articles = response.map(
    //     ({ _id, title, articleImage, description, autor, createdAt }) => {
    //       return {
    //         id: _id,
    //         title: title,
    //         shortDesc: description.substring(0, 256),
    //         img: articleImage,
    //         autor: autor,
    //         date: new Date(createdAt),
    //       };
    //     }
    //   );
    //   res.status(200).json(articles);
    // } catch (error) {
    //   res.status(500).send(`Server Error, type : ${error}`);
    // }
  }
  async getTopTen(req, res) {
    try {
      const response = await this.registerServices.topTen();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send(`Server error, type: ${error}`);
    }
  }
  async getRecord(req, res) {
    // try {
    //   const { id } = req.params;
    //   const response = await this.registerServices.getRecordById(id);
    //   const { _id, title, articleImage, description, autor, createdAt } =
    //     response;
    //   const article = {
    //     id: _id,
    //     title: title,
    //     desc: description,
    //     img: articleImage,
    //     autor: autor,
    //     date: new Date(createdAt),
    //   };
    //   res.status(200).json(article);
    // } catch (error) {
    //   res.status(500).send(`Server Error, type ${error}`);
    // }
    res.send("vamo bien desde el id");
  }
  async registerRecord(req, res) {
    const { body } = req;
    if (body.gamertag && body.score) {
      try {
        const register = await this.registerServices.postRecord(body);
        const datos = await this.registerServices.getRecords();
        const arrayOrder = datos.sort((positionA, positionB) => {
          return positionB.score - positionA.score;
        });
        const position = arrayOrder
          .map((player, index) => {
            if (
              player.gamertag == register.gamertag &&
              player.score == register.score
            ) {
              return index;
            }
          })
          .filter((data) => data !== undefined);
        console.log(position);
        res.status(200).json({
          status: true,
          register: register,
          position: position[0] + 1,
        });
      } catch (error) {
        res.status(500).send(`Server error type ${error}`);
      }
    } else {
      res
        .status(400)
        .send(`faltan parametros necesarios como el player name o el score`);
    }
  }
}
module.exports = RegisterController;
