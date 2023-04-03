const { RTCPeerConnection, RTCSessionDescription } = require('wrtc');

module.exports = function (io) {
  const pc = new RTCPeerConnection();


  io.on('connection', socket => {
    socket.on('offer', async offer => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(new RTCSessionDescription(answer));
      socket.emit('answer', answer);
    });

    socket.on('icecandidate', async candidate => {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    });
  });

  return { pc };
};


