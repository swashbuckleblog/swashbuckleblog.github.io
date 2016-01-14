library(png)
img <- readPNG('shop_owner.png')

#Set up the plot area

png('shop_owner_data.png',
    width = 900,
    height = 600)
par(mar = c(0,0,0,0))

plot(1:2, type='n', xaxt = 'n', yaxt = 'n')

#Get the plot information so the image will fill the plot box, and draw it
lim <- par()
rasterImage(img, lim$usr[1], lim$usr[3], lim$usr[2], lim$usr[4])
grid()
x <- seq(1, 2, length = 6)

y_maxs <- seq(1.2, 1.6, length = 30)
ltys <- sample(1:6, length(y_maxs), replace = TRUE)
cols <- colorRampPalette(c('white', 'grey'))(length(y_maxs))
cols <- adjustcolor(cols, alpha.f = 0.4)
for (i in 1:length(y_maxs)){
  y <- seq(1.1, y_maxs[i], length = 6) ^ 2
  lines(x,y,
        # type="b", 
        lty = ltys[i],
        lwd=1, 
        col=cols[i])
  if(i == 10){
    points(x, jitter(y, 3),
           pch = 16,
           col = adjustcolor('white', alpha. = 0.6))
  }
  if(i == 15){
    points(x, jitter(y, 3),
           pch = 16,
           col = adjustcolor('black', alpha. = 0.6))
  }
  if(i == 18){
    points(x, jitter(y, 5),
           pch = 16,
           col = adjustcolor('black', alpha. = 0.6))
  }
  if(i %in% c(20, 24, 28)){
    lines(x,jitter(y, 3),
          type="b", 
          lwd=3, 
          col=adjustcolor('white', alpha.f = 0.6))
  }
}
points(x = rep(x,5),
       y = rnorm(n = length(x)*5, mean = 1.5, sd = 0.6),
       pch = 16,
       col = adjustcolor('white', alpha.f = 0.6))
points(x = rep(x,5),
       y = rnorm(n = length(x)*5, mean = 1.5, sd = 0.6),
       pch = 17,
       col = adjustcolor('white', alpha.f = 0.6))
points(x = rep(x,5),
       y = rnorm(n = length(x)*5, mean = 1.5, sd = 0.6),
       pch = 15,
       col = adjustcolor('white', alpha.f = 0.6))
dev.off()