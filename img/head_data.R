library(png)
img <- readPNG('phone_shop.png')

#Set up the plot area

# png('phone_shop_data.png',
#     width = 3871,
#     height = 1612)
# par(mar = c(0,0,0,0))
# 
# plot(1:2, type='n', xaxt = 'n', yaxt = 'n')
# 
# #Get the plot information so the image will fill the plot box, and draw it
# lim <- par()
# rasterImage(img, lim$usr[1], lim$usr[3], lim$usr[2], lim$usr[4])
# grid(col = adjustcolor('white', alpha.f = 0.6), lty = 1, lwd = 2)
# x <- seq(1, 2, length = 6)
# 
# y_maxs <- seq(1.0, 1.6, length = 100)
# ltys <- sample(1, length(y_maxs), replace = TRUE)
# cols <- colorRampPalette(c('white', 'grey'))(length(y_maxs))
# cols <- adjustcolor(cols, alpha.f = 0.7)
# for (i in 1:length(y_maxs)){
#   y <- seq(1.1, y_maxs[i], length = 6) ^ 2
#   lines(x,y,
#         # type="b", 
#         lty = ltys[i],
#         lwd=3, 
#         col=cols[i])
#   if(i == 10){
#     points(x, jitter(y, 3),
#            pch = 16,
#            col = adjustcolor('white', alpha. = 0.9),
#            cex = 3)
#   }
#   if(i == 15){
#     points(x, jitter(y, 3),
#            pch = 16,
#            cex = 5,
#            col = adjustcolor('black', alpha. = 0.6))
#   }
#   if(i == 18){
#     points(x, jitter(y, 5),
#            pch = 16,
#            cex = 3,
#            col = adjustcolor('black', alpha. = 0.6))
#   }
#   if(i %in% c(20, 24, 28)){
#     lines(x,jitter(y, 3),
#           type="b", 
#           lwd=7, 
#           col=adjustcolor('white', alpha.f = 0.6))
#   }
# }
# points(x = rep(x,5),
#        y = rnorm(n = length(x)*5, mean = 1.5, sd = 0.6),
#        pch = 16,
#        cex = 2,
#        col = adjustcolor('white', alpha.f = 0.6))
# points(x = rep(x,5),
#        y = rnorm(n = length(x)*5, mean = 1.5, sd = 0.6),
#        pch = 17,
#        cex = 4,
#        col = adjustcolor('white', alpha.f = 0.6))
# points(x = rep(x,5),
#        y = rnorm(n = length(x)*5, mean = 1.5, sd = 0.6),
#        pch = 15,
#        cex = 3,
#        col = adjustcolor('white', alpha.f = 0.6))
# dev.off()


###########################################
library(splines)

png('phone_shop_data.png',
    width = 3871,
    height = 1280)
par(mar = c(0,0,0,0))

plot(1:2, type='n', xaxt = 'n', yaxt = 'n')

#Get the plot information so the image will fill the plot box, and draw it
lim <- par()
rasterImage(img, lim$usr[1], lim$usr[3], lim$usr[2], lim$usr[4])
grid(col = adjustcolor('white', alpha.f = 0.6), lty = 1, lwd = 2)
xs <- seq(1, 2, length = 13)
ys <- c(seq(1.25, 1.75, length = 4),
       seq(1.8, 1.5, length = 1),
       seq(1.5, 1.9, length = 4),
       seq(1.8, 1.3, length = 2),
       seq(1.4, 2, length = 2))
x2s <- seq(1, 2, length = 13)
y2s <- c(seq(1.8, 1.1, length = 3),
         seq(1.2, 1.3, length = 6),
         seq(1.4, 2, length = 4))
shapes <- seq(-1, 1, length = 20)
pchs <- sample(c(1:17), length(shapes), replace = TRUE)
for (i in 1:length(shapes)){
  xspline(x = xs,
          y = ys, 
          shape = shapes[i],
          border = adjustcolor('white', alpha.f = 0.6))
#   for (j in rnorm(n = 10, sd = 0.2)){
#     xspline(x = xs + (0.5 * j),
#             y = ys + j,
#             shape = shapes[i],
#             border = adjustcolor('white', alpha.f = 0.3))
#   }
  xspline(x = x2s,
          y = y2s, 
          shape = shapes[i],
          border = adjustcolor('white', alpha.f = 0.3))
  if(i %% 2 == 0){
    points(x = jitter(xs, factor = 2),
           y = jitter(ys, factor = 5),
           pch = pchs[i],
           cex = 4,
           col = adjustcolor('white', alpha.f = 0.4)
    )
    points(x = jitter(x2s, factor = 3),
           y = jitter(y2s, factor = 4),
           pch = pchs[i],
           cex = 4,
           col = adjustcolor('white', alpha.f = 0.4)
    )
  }
  
}
xn <- seq(1,2, length = 10)
yn <- jitter(seq(1,2, length = 10), factor = 6)
lines(x = xn,
      y = yn,
      col = adjustcolor('white', alpha.f = 0.8), 
      lwd = 4)
points(x = xn,
       y = yn, 
       col = adjustcolor('white', alpha.f = 0.8),
       pch = 17,
       cex = 4)
for (i in seq(-1, 1, length = 10)){
  xspline(x = xn,
          y = yn, 
          shape = shapes[i],
          border = adjustcolor('white', alpha.f = 0.3))
}

ynn <- (jitter(yn, factor = 2) - 0.2) ^ (1.2)
lines(x = xn,
      y = ynn,
      col = adjustcolor('white', alpha.f = 0.8), 
      lwd = 4)
for (i in seq(-1, 1, length = 10)){
  xspline(x = xn,
          y = ynn, 
          shape = shapes[i],
          border = adjustcolor('white', alpha.f = 0.3))
}
points(x = xn,
       y = ynn, 
       col = adjustcolor('white', alpha.f = 0.8),
       pch = 15,
       cex = 4)
dev.off()


